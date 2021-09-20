import { GraphQLClient } from 'graphql-request'
import { GQLRequest, GQLResponse } from '../core/abstract.interceptor'
import { RequestSnapshot } from './snapshot'
import { NativeRequestAdapter } from '../adapters/native_request.adapter'
import { RequestStrategy } from '../strategies/request.strategy'
import { ResponseStrategy } from '../strategies/response.strategy'

export class GQLContext {
  private client: GraphQLClient
  private snapshot: RequestSnapshot
  private readonly requestInterceptor = new RequestStrategy()
  private readonly responseInterceptor = new ResponseStrategy()

  public req: GQLRequest
  public res: GQLResponse
  public isRepeated = false

  constructor(client: GraphQLClient) {
    this.client = client
  }

  async setRequest(req: GQLRequest) {
    this.req = req
    await this.requestInterceptor.handle(this)
  }

  async setResponse(res: GQLResponse) {
    this.res = res
    await this.responseInterceptor.handle(this)
  }

  async sendRequest(): Promise<GQLResponse> {
    if (!this.snapshot) {
      this.createSnapshot()
    }
    // @ts-ignore
    const res = (await this.client.rawRequest.apply(
      this.client,
      new NativeRequestAdapter(this)
    )) as GQLResponse
    await this.setResponse(res)

    return this.res
  }

  async redo(): Promise<GQLResponse> {
    await this.snapshot.restore()
    this.isRepeated = true
    return await this.sendRequest()
  }

  createSnapshot() {
    this.snapshot = new RequestSnapshot(this)
  }
}

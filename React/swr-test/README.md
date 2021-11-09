## Параметры, возвращаемое значение и настройки

### Параметры

- `key!: string | function | array | null` - уникальный ключ запроса
- `fetcher!: function` - функция для получения данных, возвращающая промис
- `options?: object` - объект с настройками

### Возвращаемое значение

- `data: any` - данные для указанного ключа, разрешенные `fetcher`, или `undefined`
- `error: any` - исключение, выброшенное `fetcher` или `undefined`
- `isValidating: boolean` - индикатор выполнения запроса
- `mutate(data?, shouldRevalidate?): function` - функция для мутирования кешированных данных

### Настройки

- `suspense: boolean = false` - включает режим `React Suspense`
- `fetcher: function` - функция для получения данных
- `revalidateIfStale: boolean = true` - автоматическое выполнение повторного запроса (ревалидация) при монтировании компонента даже при наличии старых данных
- `revalidateOnMount: boolean` - автоматическая ревалидация после монтирования компонента
- `revalidateOnFocus: boolean = true` - автоматическая ревалидация при установке фокуса на область видимости
- `revalidateOnReconnect: boolean = true` - автоматическая ревалидация при восстановлении соединения с сетью (через `navigator.onLine`)
- `refreshInterval: number = 0` - интервал опроса (ревалидации) в мс (по умолчанию отключено)
- `refreshWhenHidden: boolean = false` - выполнение обновления только когда окно браузера не находится в фокусе
- `refreshWhenOffline: boolean = false` - обновление обновления только в режиме оффлайн (через `navigator.onLine`)
- `shouldRetryOnError: boolean = true` - отправка повторного запроса при возникновении ошибки
- `dedupingInterval: number = 2000` - повторные запросы (с одинаковыми ключами) в течение указанного в мс времени не выполняются
- `focusThrottleInterval: number = 5000` - выполнять ревалидацию только по истечении указанного в мс времени
- `loadingTimeout: number = 3000` - задержка в мс для запуска события `onLoadingSlow`
- `errorRetryInterval: number = 5000` - задержка в мс для выполнения повторного запроса в случае возникновения ошибки
- `errorRetryCount: number` - максимальное количество попыток ревалидации при ошибке
- `fallback: { string: object }` - объект с резервными данными
- `fallbackData: object` - данные для первоначального ответа
- `onLoadingSlow(key: string, config: object): function` - колбек, вызываемый в случае, когда выполнение запроса занимает слишком много времени (`loadingTimeout`)
- `onSuccess(data: any, key: string, config: object): function` - колбек, вызываемый при успешном выполнении запроса
- `onError(error: any, key: string, config: object): function` - колек, вызываемый при провале запроса
- `onErrorRetry(error: any, key: string, config: object, revalidate: function, revalidateOptions: object): function` - обработчик ревалидации при ошибке
- `compare: function` - функция для определения отличий между данными (по умолчанию используется [`dequal`](https://github.com/lukeed/dequal))
- `isPaused: function` - функция для приостановки ревалидаций. Если возвращает `true`, данные и ошибки игнорируются (по умолчанию возвращает `false`)
- `use: array` - массив посредников (промежуточных обработчиков)

## Глобальные настройки

Для передачи настроек всем нижележащим хукам (через контекст) используется компонент `SWRConfig`. Сами настройки передаются через проп `value`.

В следующем примере все хуки используют один `fetcher` для получения данных и их разбора в `JSON` и выполняют повторные запросы каждые 3 сек:

```js
import useSWR, { SWRConfig } from 'swr'

function Dashboard() {
  const { data: events } = useSWR('/api/events')
  const { data: projects } = useSWR('/api/projects')
  const { data: user } = useSWR('/api/user', { refreshInterval: 0 }) // перезаписываем глобальные настройки

  // рендеринг
}

function App() {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (url) => fetch(url).then(res => res.json())
      }}
    >
      <Dashboard />
    </SWRConfig>
  )
}
```

Для доступа к глобальным настройкам, а также к функции для обновления кеша и самому кешу используется хук `useSWRConfig`:

```js
import { useSWRConfig } from 'swr

function Component() {
  const { refreshInterval, mutate, cache, ...rest } = useSWRConfig()

  // ...
}
```

## Отключение повторной валидации

Если ресурс является иммутабельным, данные, полученные от него, никогда не изменятся. Это означает, что у нас нет необходимости выполнять соответствующий запрос повторно.

Для получения данных из иммутабельного ресурса предназначен хук `useSWRImmutable`:

```js
import useSWRImmutable from 'swr/immutable'

useSWRImmutable(key, fetcher, options)
```

Это эквивалентно следующему:

```js
useSWR(key fetcher, {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false
})
```

## Условное получение данных

Для условного получения данных можно использовать `null` или передать функцию в качестве `key`. Если функция выбросит исключение или вернет ложное значение, запрос не будет выполнен:

```js
// условный запрос
const { data } = useSWR(shouldFetch ? '/api/data' : null, fetcher)

// или так
const { data } = useSWR(() => shouldFetch ? '/api/data' : null, fetcher)

// или так (выбрасываем ошибку, когда `user.id` не определен)
const { data } = useSWR(() => '/api/data?uid=' + user.id, fetcher)
```

`SWR` также позволяет получать данные, которые зависят от других данных. Он обеспечивает максимально возможный параллелизм (без водопадов), а также последовательное выполнение запросов, когда данные из предыдущего запроса необходимы для выполнения следующего:

```js
function MyProject() {
  const { data: user } = useSWR('/api/user')
  const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)
  // При передачи функции `SWR` будет использовать возвращенное этой функцией
  // значение в качестве ключа. Если функция выбрасывает исключение или возвращает
  // ложное значение, значит, некоторые зависимости еще не готовы.
  // В данном случае, если попытка получить доступ к `user.id` заканчивается ошибкой,
  // значит, `user` еще не загружен.

  if (!project) return 'Загрузка...'
  return `У вас ${projects.length} проектов`
}
```
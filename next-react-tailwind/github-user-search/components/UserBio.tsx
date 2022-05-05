export const UserBio = (props: { bio: string }) => (
  <p className="text-center font-mono text-sm font-medium text-gray-800 dark:text-gray-300 ">
    Bio - {props.bio ? 'Not Available' : props.bio}
  </p>
)

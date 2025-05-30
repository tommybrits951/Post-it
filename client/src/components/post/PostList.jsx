import PostTab from "./PostTab"


export default function PostList({posts}) {

  return (
    <ul className="absolute top-32 w-1/2 left-1/4 h-8/12 overflow-y-scroll rounded-xl py-2 ">
      {!posts ? <p>Loading...</p> : posts.map((post, idx) => {
        return <PostTab key={idx} post={post} />
      })}
    </ul>
  )
}

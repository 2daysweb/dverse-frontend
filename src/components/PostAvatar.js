function PostForm(props) {
    function handleAttachment(signedIds) {
      const body = JSON.stringify({ post: {avatar:props.avatar, images: signedIds }})
      fetch('/posts.json', { method: 'POST', body })
    }
  
    return (
      <DirectUploadProvider multiple onSuccess={handleAttachment} render={props} />
    )
  }
import { useState } from "react";
import { getCurrentUser } from "../../utils/authentic";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faThumbsUp, faCommentDots } from '@fortawesome/free-solid-svg-icons';
let currentUser = getCurrentUser() ? getCurrentUser().username : null;

const BlogPost = ({ blog, likePost, addComment, updateBlog, deleteBlog }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editContent, setEditContent] = useState(blog.content);
  const navigate = useNavigate();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (currentUser) {
      if (comment.trim()) {
        addComment(blog.id, comment);
        setComment("");
      }
    } else {
      navigate('/login');
    }
  };

  function showCommentModal() {
    document.getElementById("commentModal").style.display = "block";
  }
  
  function hideCommentModal() {
    document.getElementById("commentModal").style.display = "none";
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    let blogData = JSON.parse(localStorage.getItem("blogs"));
    let currId = blog.id;
    let editedPostIndex = blogData.findIndex((blog) => blog.id === currId);
    if (editedPostIndex !== -1) {
      blogData[editedPostIndex].title = editTitle;
      blogData[editedPostIndex].content = editContent;
      localStorage.setItem("blogs", JSON.stringify(blogData));
    }
    window.location.reload();
    setIsEditing(false);
  };

  const handleDelete = () => {
    let currId = blog.id;
    let blogData = JSON.parse(localStorage.getItem("blogs"));
    let editedPostIndex = blogData.findIndex((blog) => blog.id === currId);
    if (editedPostIndex !== -1) {
      blogData.splice(editedPostIndex, 1);
      localStorage.setItem("blogs", JSON.stringify(blogData));
    }
    window.location.reload();
  };

  const addCommentToLocalStorage = (blogId, commentText) => {
    let blogData = JSON.parse(localStorage.getItem("blogs"));
    let currBlogIndex = blogData.findIndex((blog) => blog.id === blogId);
    if (currBlogIndex !== -1) {
      if (!blogData[currBlogIndex].comments) {
        blogData[currBlogIndex].comments = [];
      }
      blogData[currBlogIndex].comments.push([currentUser, commentText]);
      localStorage.setItem("blogs", JSON.stringify(blogData));
    }
  };



  return (
    <div className="blog-post">
      <div className="blog-header">
      <h3><img src='../profile.png' width= '40px'></img> {blog.author}</h3>
      <div>
      {currentUser == blog.author ? (
            <>
              <div className="btn_container">
                <button onClick={handleEdit}><FontAwesomeIcon style={{ fontSize: '25px' }} icon={faEdit} /></button>
                <button onClick={handleDelete}><FontAwesomeIcon style={{ fontSize: '25px' }} icon={faTrash} /></button>
              </div>
            </>
          ) : (
            <>
              <div></div>
            </>
          )}
      </div>
      </div>
      
      {isEditing ? (
        <>
          <div class="max">
            <div>
              <label for="title">Title:</label>
              <input
                type="text"
                id="title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            <div>
              <label for="content">Content:</label>
              <textarea
                id="content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button onClick={handleSaveEdit}>Save</button>
        </>
      ) : (
        <>
          <h2>{blog.title}</h2>
          <p className="contentt">{blog.content}</p>
        </>
      )}
      <div>
  <div className='thumb'>
    <button onClick={() => likePost(blog.id)}>
      <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faThumbsUp} />({blog.likes})
    </button>
    <button onClick={() => showCommentModal()}>
      <FontAwesomeIcon style={{ fontSize: '25px' }} icon={faCommentDots} />
    </button>
  </div>
</div>

<div id="commentModal" className="modal">
  <div className="modal-content">
    <span className="close-button" onClick={() => hideCommentModal()}>&times;</span>
    <form onSubmit={(e) => {
      handleCommentSubmit(e);
      addCommentToLocalStorage(blog.id, comment);
      hideCommentModal();
    }}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button type="submit">Comment</button>
    </form>
  </div>
</div>

<div className="comments">
  <label htmlFor="content">Comments:</label>
  {blog.comments && blog.comments.length > 0 ? (
    blog.comments.map((comment, index) => (
      <p key={index} className="comment">
        <b>{currentUser}</b>: {comment}
      </p>
    ))
  ) : (
    <p>No comments</p>
  )}
</div>
    </div>
  );
};

export default BlogPost;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { wouteAPI } from "./../../api";
import moment from "moment";
import "moment/locale/ko";
import Layer from "./../Layer"
import { toast } from 'react-toastify'

moment.locale("ko");

function Reply({ feedData, id, wouteFeeds, setLoading, user }) {
  const navigate = useNavigate()
  const titleRef = useRef(null)
  const feedId = feedData.id;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState({});
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [commentChanged, setCommentChanged] = useState(false);
  const [layer, setLayer] = useState(false)
  const [message, setMessage] = useState('')
  const [method, setMethod] = useState('')
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [tags, setTags] = useState([])

  const fetchData = async () => {
    try {
      const commentsResponse = await wouteAPI(`/p/${id}/reply`, "GET");
      // setComments(commentsResponse.data);
      const sortedComments = commentsResponse.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);
      setTitle(feedData.title)
      setContents(feedData.content)
      let _tags = []
      for(let tag of feedData.tags) {
        _tags.push(tag.words)
      }
      setTags(_tags)
      const newLikes = commentsResponse.data.reduce(
        (acc, comment) => ({
          ...acc,
          [comment.reply_id]: comment.heartCount || 0,
        }),
        {}
      );
      setLikes(newLikes);
    } catch (error) {
      // console.error("데이터 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [feedId]);

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleClose = () => {
    setIsActive(false);
  };

  const addComment = async () => {
    console.log(user)
    try {
      const response = await wouteAPI(`/p/${feedId}/reply`, "POST", {
        feed_id: feedId,
        content,
        nickname: user.nickname,
        profileImage: user.profileImage,
        heartCount: 0,
      });
      setComments((prevComments) => [...prevComments, response.data]);
      setContent("");
      // setCommentChanged(!commentChanged);
      fetchData();
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };

  const deleteComment = async (replyId) => {
    try {
      await wouteAPI(`/p/${feedId}/${replyId}`, "DELETE");
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.reply_id !== replyId)
      );
      setCommentChanged(!commentChanged);
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  };

  const toggleLike = async (replyId, userId) => {
    try {
      const requestBody = {
        userId: userId,
        replyId,
      };
      await wouteAPI(
        `/p/${feedId}/${replyId}/like`,
        likes[replyId] ? "DELETE" : "PUT",
        requestBody
      );
      setLikes({ ...likes, [replyId]: !likes[replyId] });
      setCommentChanged(!commentChanged);
      fetchData();
    } catch (error) {
      console.error("좋아요 상태 변경 실패:", error);
    }
  };

  const handleSendComment = async () => {
    if (content.trim() === "") {
      toast.warn("내용을입력해주세요.");

      return;
    }
    await addComment();
  };

  const handleEdit = () => {
    setEdit(true)
    setTimeout(() => {
      titleRef.current.focus()
    }, 100)
  }

  const handleCanceled = () => {
    setEdit(false)
    setTitle(feedData.title)
    setContents(feedData.content)
  }

  const handleController = async confirm => {
    setLayer(false)
    if(!confirm) {
      return
    }
    if(method === 'delete') {
      try {
        await wouteAPI(`/p/${feedId}`, 'DELETE', null)
        toast.success('피드가 삭제 되었습니다.')
        setLoading(false)
        wouteFeeds()
        navigate('/')
      } catch(err) {
        console.log('에러: ' + err)
      }
    }   
    if(method === 'save') {
      if(title === '') {
        toast.warn('제목을 입력해 주세요.')
        return
      }
      if(contents === '') {
          toast.warn('내용을 입력해 주세요.')
          return
      }
      const formData = new FormData()
      let reg = /#([\S]+)/igm
      let matches = (contents.match(reg) || [])
      
      let feed = {
          title: title,
          content: contents,
      }

      formData.append('feed', new Blob([JSON.stringify(feed)], {type: 'application/json'}))
      formData.append('tags', new Blob([JSON.stringify(matches)], {type: 'application/json'}))
      
      try {
        await wouteAPI(`/p/${feedId}`, 'PUT', formData)
        toast.success('피드가 저장 되었습니다.')
        setEdit(false)
        wouteFeeds()
        setTags(matches)
      } catch (err) {
        console.log('에러: ' + err)
      }
    }     
    setMethod('')
  }

  const handleLayer = (method, msg) => {
    setMethod(method)
    setMessage(msg)
    setLayer(true)
  }

  const handleContent = e => {
    let value = e.target.value
    setContents(value)
  }

  return (
    <>
      <div className="feedArea">
        <div className={`feedAreaInner ${isActive ? "focused" : ""}`}>
          <div className="myName feedProfile">
            <i
              style={{
                backgroundImage: feedData.profileImage
                  ? `url('${feedData.profileImage}')`
                  : "none",
              }}
            >
              <p>{feedData.nickname}</p>
            </i>
            <i className="feedClose" onClick={handleClose}></i>
          </div>
          <div className="myfeedTitle">
            <p>
              {
                edit ? (
                  <>
                  <input type='text' name='title' placeholder='타이틀을 입력하세요.' value={title} onChange={e=>setTitle(e.target.value)} ref={titleRef}/>
                  <div>
                      <button onClick={ handleCanceled }>취소</button>
                      <button onClick={()=>handleLayer('save', '저장 하시겠습니까?') }>저장</button>
                  </div>   
                  </>
                ) : (
                  <>
                    {title}
                    <div>
                      <button onClick={ handleEdit }>수정</button>
                      <button onClick={()=>handleLayer('delete', '삭제 하시겠습니까?') }>삭제</button>
                    </div>    
                  </>
                )
              }
            </p>
          </div>
          <div>
            <div className="myfeedContent">
              <p>
                {
                  edit ? (
                    <textarea name='content' placeholder='#을 이용하여 태그를 사용해 보세요.' value={contents} onChange={ handleContent }></textarea>
                  ) : (
                    <>{contents}</>
                  )
                }
                </p>
              <p>
              {
                  !edit && (
                    tags?.map((item, i) => (
                      <span key={ i }>{ item }</span>    
                    ))
                  )
              }
              </p>
            </div>
            <div className="userComments">
              {comments.map((comment) => (
                <div className="userComment" key={comment.reply_id}>
                  <div className="feedProfiles">
                    <div className="feedProfile">
                      <i
                        style={{
                          backgroundImage: comment.profileImage
                            ? `url('${comment.profileImage}')`
                            : "https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png",
                        }}
                      />
                    </div>
                    <div className="userNames">
                      <span className="userName">{comment.nickname}</span>
                      <span>{comment.content}</span>
                      <div className="replyPart">
                        <span>{moment(comment.createdAt).fromNow()}</span>
                        <span>{comment.heartCount}개</span>
                        <div
                          className="deleteReply"
                          onClick={() => deleteComment(comment.reply_id)}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="likeHearts">
                    <div
                      className={`likeHeart ${
                        likes[comment.reply_id] ? "active" : ""
                      }`}
                      onClick={() => toggleLike(comment.reply_id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="myMent">
          <div className=" feedProfile">
            <i
              style={{backgroundImage: `url(${ user?.profileImage })`}}
            />
          </div>
          <input
            placeholder="댓글을 입력하세요"
            onFocus={handleFocus}
            value={content}
            onChange={handleInputChange}
          />
          <input type="hidden" value={feedId} name="feedId" />
          <div className="submitBtn">
            <button type="button" onClick={handleSendComment}></button>
          </div>
        </div>
      </div>
      {
        layer && <Layer handleController={ handleController } message={ message } />
      }
    </>
  );
}

export default Reply;
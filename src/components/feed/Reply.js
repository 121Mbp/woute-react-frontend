import React, { useState, useEffect } from "react";
import { wouteAPI } from "./../../api";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

function Reply({ feedData }) {
  const feedId = feedData.id;
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState({});
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [commentChanged, setCommentChanged] = useState(false);

  const fetchData = async () => {
    try {
      const commentsResponse = await wouteAPI(`/p/${feedId}/reply`, "GET");
      // setComments(commentsResponse.data);
      const sortedComments = commentsResponse.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setComments(sortedComments);

      const newLikes = commentsResponse.data.reduce(
        (acc, comment) => ({
          ...acc,
          [comment.reply_id]: comment.heartCount || 0,
        }),
        {}
      );
      setLikes(newLikes);
    } catch (error) {
      console.error("데이터 불러오기 실패:", error);
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
    try {
      const response = await wouteAPI(`/p/${feedId}/reply`, "POST", {
        feed_id: feedId,
        content,
        nickname: "dominic",
        profileImage: "https://i.ytimg.com/vi/lSJ2Le7Ewdw/maxresdefault.jpg",
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
    console.log(`feedId: ${feedId}, replyId: ${replyId}, userId: ${userId}`);
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
    await addComment();
  };
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
            <p>{feedData.title}</p>
          </div>
          <div>
            <div className="myfeedContent">
              <p>{feedData.content}</p>
              <p>
              {
                  feedData?.tags?.map(item => (
                      <span key={ item.id }>{ item.words }</span>    
                  ))
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
              style={{
                backgroundImage:
                  "url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)",
              }}
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
    </>
  );
}

export default Reply;
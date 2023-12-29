import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { wouteAPI } from "./../../api"

function Reply(props) {
  const [content, setContent] = useState("");
  const feedId = props.id;
  const handleOnClick = async () => {
    console.log("props   " + feedId);
    if (!feedId) {
      console.error("FeedID가없어요");
      return;
    }

    try {
      const response = await wouteAPI(`/p/${feedId}/reply`, 'POST', content);
      console.log("서버 응답:", response.data);
      setContent("");
    } catch (error) {
      console.error("에러 발생:", error.message);
    }
  };

  const handleInputChange = (e) => {
    setContent(e.target.value);
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOnClick();
    }
  };
  const [comments, setComments] = useState([
    { id: 1, content: "첫 번째 댓글입니다." },
    { id: 2, content: "두 번째 댓글입니다." },
    { id: 3, content: "두 번째 댓글입니다." },
    { id: 4, content: "두 번째 댓글입니다." },
    { id: 5, content: "두 번째 댓글입니다." },
    { id: 6, content: "두 번째 댓글입니다." },
    { id: 7, content: "두 번째 댓글입니다." },
    { id: 8, content: "두 번째 댓글입니다." },
    { id: 9, content: "두 번째 댓글입니다." },
    { id: 10, content: "두 번째 댓글입니다." },
  ]);
  const [isActive, setIsActive] = useState(false);
  const [likes, setLikes] = useState(
    comments.reduce((acc, comment) => ({ ...acc, [comment.id]: 0 }), {})
  );
  const deleteComment = (id) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const handleFocus = () => {
    setIsActive(true);
  };
  const handleClose = () => {
    setIsActive(false);
  };
  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: prevLikes[id] ? prevLikes[id] - 1 : 1,
    }));
  };

  return (
    <div className="feedArea">
      <div className={`feedAreaInner ${isActive ? "focused" : ""}`}>
        <div className="myName feedProfile">
          <i
            style={{
              backgroundImage:
                "url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)",
            }}
          >
            <p>MarsKing</p>
          </i>
          <i className="feedClose" onClick={handleClose}></i>
        </div>
        <div className="myfeedTitle">
          <p>흰 여울 문화 마을</p>
        </div>
        <div>
          <div className="myfeedContent">
            <p>
              낮에도 이쁘지만, 야경이 정말이쁩니다.
              <br />
              마을 안 헤일르 카페는 통창이 크고 다대가 높아 편히 넓은 바다를
              내려다 볼 수 있어요.
              <br />
              겨울이지만 많이 걸어 아이크름이 딱입니다!
              <br />
              루프탑도 조용하고 뷰도 걸리적 거리는것이 좋았습니다.
            </p>
          </div>
          <div className="userComments">
            {comments.map((comment) => (
              <div className="userComment" key={comment.id}>
                <div className="feedProfiles">
                  <div className="feedProfile">
                    <i
                      style={{
                        backgroundImage:
                          "url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/255px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg)",
                      }}
                    />
                  </div>
                  <div className="userNames">
                    <span className="userName">저커버그</span>
                    <span>
                      빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아빵빵아
                    </span>
                    <div className="replyPart">
                      <span>14시간전</span>
                      <span>좋아요 {likes[comment.id]}개</span>{" "}
                      <div
                        className="deleteReply"
                        onClick={() => deleteComment(comment.id)}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="likeHearts">
                  <div
                    className={`likeHeart ${likes[comment.id] ? "active" : ""}`}
                    onClick={() => toggleLike(comment.id)}
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
          onKeyPress={handleOnKeyPress}
          value={content}
          onChange={handleInputChange}
        />
        <input type="hidden" value={feedId} name="feedId" />
        <div className="submitBtn">
          <button type="button" onClick={handleOnClick}></button>
        </div>
      </div>
    </div>
  );
}

export default Reply;
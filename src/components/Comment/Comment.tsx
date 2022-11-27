import { Avatar } from "antd";
import Ava from "../../assets/img/commentAva.svg";
import { CommentType } from "../../models/comment";
import "./comment.scss";


export function Comment({ name, email, body }: CommentType) {

  return (
    <div className="commentItem">
      <div className="commentAuthor">
        <Avatar
          src={Ava}
          alt="awesome avatar"
          size={40}
        />
        <p>{email}</p>
      </div>

      <div className="commentBody">
        <h4>{name}</h4>
        <p>{body}</p>
      </div>
    </div>
  );
}
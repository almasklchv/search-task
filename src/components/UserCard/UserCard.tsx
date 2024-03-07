import { memo } from "react";
import "./style.css";
import { User } from "./user.interface";

export const UserCard = memo((props: User): React.ReactElement => {
  return (
    <div className="userCard">
      <img className="userPic" src={props.image} />
      <div className="userInfo">
        <div>{`${props.firstName} ${props.lastName}`}</div>
        <div>{props.address.city}</div>
      </div>
    </div>
  );
});

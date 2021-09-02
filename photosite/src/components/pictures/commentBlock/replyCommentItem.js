import { useEffect, useState, useContext } from "react";
import './replyCommentItem.css';
import { Context } from "../../../index.js";
import { deployReplyComment } from "../commentDeploymentScript";
import { redactReplyComment } from "../commentRedactAnimationFunc";
import ReplyCommentInputBlock from "./replyCommentInputBlock";
import { getUser } from "../../../http/userAPI";
import { postReplyCommentChanges, deleteReplyComment } from "../../../http/replyCommentAPI";
import { likeReplyComment, getReplyCommentLikes } from "../../../http/replyCommentLikeAPI";
const ReplyCommentItem = ({ replyComment, updateReplyCommentsList }) => {
    const { user } = useContext(Context);
    const [userInfo, setUserInfo] = useState({ user: { nickname: "Загружается" } });
    const [replyCommentChanges, setReplyCommentChanges] = useState('');
    const [replyCommentLikes, setReplyCommentLikes] = useState('');
    const [isLiked, setIsLiked] = useState();
    const [amountOfLikes, setAmountOfLikes] = useState('');

    const [replyCommentInputState, setReplyCommentInputState] = useState('hidden');

    const getLikes = async (replyCommentId) => {
        try {
            const data = await getReplyCommentLikes(replyCommentId);
            setReplyCommentLikes(data.rows);
            setAmountOfLikes(data.count);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    const checkIfLikedFunction = async () => {
        if (replyCommentLikes.length === 0) {
            return setIsLiked(false);
        }
        for (let i = 0; i < replyCommentLikes.length; i++) {
            if (replyCommentLikes[i].userId === user._user.id) {
                setIsLiked(true);
                break;
            } else {
                setIsLiked(false);
                continue;
            }
        }
    };

    const likeReplyCommentFunction = async (replyCommentId) => {
        try {
            await likeReplyComment(replyCommentId);
            return getLikes(replyCommentId);
        } catch (e) {
            alert(e.response.data.message);
        }

    };

    const postReplyCommentChangesFunction = async (replyCommentId, text) => {
        try {
            const stringFullness = replyCommentChanges.split(' ').join('');
            if (stringFullness) {
                const data = await postReplyCommentChanges(replyCommentId, text);
                updateReplyCommentsList();
                return alert(data.response);
            }
            return alert('Комментарий не изменен или пуст');
        } catch (e) {
            alert(e.response.data.value);
        }


    };
    const deleteReplyCommentFunction = async (replyCommentId) => {
        try {
            let answer = window.confirm('Вы уверены, что хотите удалить свой комментарий');
            if (answer) {
                const data = await deleteReplyComment(replyCommentId);
                updateReplyCommentsList();
                return alert(data.response);
            }
            return;

        } catch (e) {
            return alert(e.response.data.message);
        }
    };

    useEffect(() => {
        getUser(replyComment.userId).then((data) => setUserInfo(data)).catch((e) => alert(e.response.data.message));
        getLikes(replyComment.id);
    }, [replyComment]);
    useEffect(() => {
        checkIfLikedFunction();
    }, [replyCommentLikes]);

    return (
        <div className="leavedReplyComments-replyCommentBlock">
            <section className="leavedReplyComments-replyCommentBlock_addInfo">
                <div>{userInfo.user.nickname}</div>
                <div>{`${new Date(replyComment.createdAt).getFullYear()} ${new Date(replyComment.createdAt).getDate()} ${new Date(replyComment.createdAt).toLocaleString('default', { month: 'long' })}`}</div>
            </section>
            <textarea
                readOnly
                defaultValue={replyComment.text}
                className='leavedReplyComments-replyCommentBlock__replyComment'
                onChange={(e) => setReplyCommentChanges(e.target.value)}>

            </textarea>
            <section className="leavedReplyComments-replyCommentBlock__buttonsBlock">
                {replyComment.userId === user._user.id ?
                    <section>
                        <button className='replyCommentBlock__buttonsBlock-scaleCommentButton' onClick={(e) => deployReplyComment(e.target)}>Развернуть</button>
                        <button className="replyCommentBlock__buttonsBlock-redactButton" onClick={(e) => redactReplyComment(e.target)}>redact</button>
                        <button
                            className="replyCommentBlock__buttonsBlock-createReplyCommentButton createReplyComment"
                            onClick={() => !replyCommentInputState ? setReplyCommentInputState('hidden') : setReplyCommentInputState('')}>Ответить</button>
                        <button
                            className="replyCommentBlock__buttonsBlock-postButton disabledButton"
                            onClick={() => postReplyCommentChangesFunction(replyComment.id, replyCommentChanges)}>
                            post changes
                        </button>
                        <button onClick={() => deleteReplyCommentFunction(replyComment.id)}>delete</button>
                    </section>
                    :
                    <section>
                        <button className='replyCommentBlock__buttonsBlock-scaleCommentButton' onClick={(e) => deployReplyComment(e.target)}>Развернуть</button>
                        <button
                            className="replyCommentBlock__buttonsBlock-createReplyCommentButton createReplyComment"
                            onClick={() => !replyCommentInputState ? setReplyCommentInputState('hidden') : setReplyCommentInputState('')}>
                            Ответить
                        </button>
                    </section>
                }
                <section className="replyCommentBlock__buttonsBlock-likeItem">
                    {
                        isLiked ?
                            <button className='likeButton' onClick={() => likeReplyCommentFunction(replyComment.id)}>
                                <svg className="svgLikedIcon" width="20" height='20' viewBox="0 0 120 120">
                                    <path d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z" />
                                </svg>
                            </button>
                            :
                            <button className='likeButton' onClick={() => likeReplyCommentFunction(replyComment.id)}>
                                <svg className="svgUnLikedIcon" width="20" height='20' viewBox="0 0 120 120">
                                    <path d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z" />
                                </svg>
                            </button>
                    }

                    <div className="amountOfLikesItem">{amountOfLikes}</div>
                </section>
            </section>
            <ReplyCommentInputBlock key={userInfo.user.nickname} state={replyCommentInputState} userInfo={userInfo} commentId={replyComment.commentId} updateReplyCommentsList={updateReplyCommentsList} />
        </div>
    )
};
export default ReplyCommentItem;
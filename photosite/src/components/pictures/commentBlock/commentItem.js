import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
// import deployComment from '../commentDeploymentScript';
import { deployComment } from '../commentDeploymentScript';
import { redactComment } from '../commentRedactAnimationFunc';
import { showReplyComments } from './showReplyComments';
import ReplyCommentItem from './replyCommentItem';
import { getUser } from '../../../http/userAPI';
import { getPictureComments, postCommentChanges, deleteComment } from '../../../http/commentsAPI';
import { likeComment, getCommentLikes } from '../../../http/commentLikeAPI';
import { getAllReplyComments } from '../../../http/replyCommentAPI';


const CommentItem = observer(({ picture, comment }) => {
    const { pictureComments } = useContext(Context);
    const { user } = useContext(Context);
    const [changedComment, setChangedComment] = useState('');
    const [commentLikeInfo, setCommentLikeInfo] = useState([]);
    const [amountOfLikes, setAmountOfLikes] = useState('');
    const [isLiked, setIsLiked] = useState('');
    const [userInfo, setUserInfo] = useState({ user: { nickname: "Загружается" } });
    const [replyComments, setReplyComments] = useState([]);


    const deleteCommentFunction = async (id) => {
        try {
            let answer = window.confirm('Вы уверены, что хотите удалить свой комментарий');
            if (answer) {
                const response = await deleteComment(id);
                getPictureComments(picture.id).then(data => pictureComments.setPictureComments(data.comments)).catch((e) => alert(e.response.data.message));
                return alert(response.message);
            }
            return;

        } catch (e) {
            alert(e.response.message.data);
        }
    };
    const likeCommentFunction = async (commentId) => {
        try {
            const response = await likeComment(commentId);
            getCommentLikesInfo(commentId);
        } catch (e) {
            return alert(e.response.data.message);
        }
    };
    const postCommentChangesFunction = async (id) => {
        try {
            if (changedComment) {
                const response = await postCommentChanges(id, changedComment);
                alert(response);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    };
    const getCommentLikesInfo = async (commentId) => {
        const response = await getCommentLikes(commentId);
        setCommentLikeInfo(response.commentLikes.rows);
        setAmountOfLikes(response.commentLikes.count);
    };
    const checkIfLikedFunction = () => {
        if (commentLikeInfo.length === 0) {
            return setIsLiked(false);
        }
        for (let i = 0; i < commentLikeInfo.length; i++) {
            if (commentLikeInfo[i].userId === user._user.id) {
                setIsLiked(true);
                break;
            } else {
                setIsLiked(false);
                continue;
            }
        }
        return;
    };

    useEffect(() => {
        checkIfLikedFunction();
    }, [commentLikeInfo]);
    useEffect(() => {
        getUser(comment.userId).then(data => setUserInfo(data)).catch((e) => alert(e.response.data.message));
        getAllReplyComments(comment.id).then((data) => setReplyComments(data.rows)).catch((e) => alert(e));
    }, [comment]);
    useEffect(() => {
        getCommentLikesInfo(comment.id);
    }, []);

    return (
        comment.userId === user._user.id ?
            <div className="leavedComments-commentBlock" key={comment.id}>
                <section className="leavedComments-commentBlock_addInfo">
                    <div>{userInfo.user.nickname}</div>
                    <div>{`${new Date(comment.createdAt).getFullYear()} ${new Date(comment.createdAt).getDate()} ${new Date(comment.createdAt).toLocaleString('default', { month: 'long' })}`}</div>
                </section>
                <textarea readOnly defaultValue={comment.text} className='leavedComments-commentBlock__comment' onChange={(e) => setChangedComment(e.target.value)} />
                <section className="leavedComments-commentBlock__buttonsBlock">
                    <section>
                        <button className='leavedComments-scaleCommentButton' onClick={(e) => deployComment(e.target)}>Развернуть</button>
                        <button onClick={(e) => redactComment(e.target)} className="leavedComments-commentBlock__redactButton">redact</button>
                        <button className="leavedComments-commentBlock__postButton disabledButton" onClick={() => postCommentChangesFunction(comment.id)}>post changes</button>
                        <button onClick={() => deleteCommentFunction(comment.id)}>delete</button>
                        <button className="leavedComments-commentBlock__showReplyCommentsButton" onClick={(e) => showReplyComments(e.target)}>Ответы</button>
                    </section>
                    <section className='commentBlock__buttonsBlock-likeItem'>
                        {
                            isLiked ?
                                <button className='likeButton' onClick={() => likeCommentFunction(comment.id)}>
                                    <svg className="svgLikedIcon" width="20" height='20' viewBox="0 0 120 120">
                                        <path d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z" />
                                    </svg>
                                </button>
                                :
                                <button className='likeButton' onClick={() => likeCommentFunction(comment.id)}>
                                    <svg className="svgUnLikedIcon" width="20" height='20' viewBox="0 0 120 120">
                                        <path d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z" />
                                    </svg>
                                </button>
                        }
                        <div className="amountOfLikesItem">{amountOfLikes}</div>
                    </section>
                </section>
                <section className="commentBlock-leavedReplyComments hidden">
                    {
                        replyComments.map(replyComment => {
                            return (
                                <ReplyCommentItem replyComment={replyComment} userInfo={userInfo} />
                            )
                        })
                    }

                </section>
            </div>
            :
            <div className="leavedComments-commentBlock" key={comment.id}>
                <section className="leavedComments-commentBlock_addInfo">
                    <div>{userInfo.user.nickname}</div>
                    <div>{`${new Date(comment.createdAt).getFullYear()} ${new Date(comment.createdAt).getDate()} ${new Date(comment.createdAt).toLocaleString('default', { month: 'long' })}`}</div>
                </section>
                <div className={`leavedComments-commentBlock__comment`}>{comment.text}</div>
                <section className="leavedComments-commentBlock__buttonsBlock">
                    <section>
                        <button className='leavedComments-scaleCommentButton' onClick={(e) => deployComment(e.target)} > Развернуть</button>
                        <button className="leavedComments-commentBlock__showReplyCommentsButton" onClick={(e) => showReplyComments(e.target)}>Ответы</button>
                    </section>
                    <section className='commentBlock__buttonsBlock-likeItem'>
                        {
                            isLiked ?
                                <button className='likeButton' onClick={() => likeCommentFunction(comment.id)}>
                                    <svg className="svgLikedIcon" width="20" height='20' viewBox="0 0 120 120">
                                        <path d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z" />
                                    </svg>
                                </button>
                                :
                                <button className='likeButton' onClick={() => likeCommentFunction(comment.id)}>
                                    <svg className="svgUnLikedIcon" width="20" height='20' viewBox="0 0 120 120">
                                        <path d="M90.35,16.05c-11.66,0-21.81,6.97-26.35,17.06c-4.54-10.08-14.69-17.06-26.35-17.06 c-15.92,0-28.87,12.96-28.87,28.88c0,35.9,51.79,65.46,54,66.7c0.38,0.21,0.79,0.32,1.21,0.32c0.42,0,0.84-0.11,1.21-0.32 c2.2-1.24,54.01-30.8,54.01-66.7C119.22,29.01,106.27,16.05,90.35,16.05z" />
                                    </svg>
                                </button>
                        }
                        <div className="amountOfLikesItem">{amountOfLikes}</div>
                    </section>
                </section>
                <section className="commentBlock-leavedReplyComments hidden">
                    {
                        replyComments.map(replyComment => {
                            return (
                                <ReplyCommentItem replyComment={replyComment} userInfo={userInfo} />
                            )
                        })
                    }
                </section>
            </div>
    )
});
export default CommentItem;
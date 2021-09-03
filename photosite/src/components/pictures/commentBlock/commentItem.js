import React, { useContext, useState, useEffect } from 'react';
import './commentItem.css';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import { deployComment } from '../commentDeploymentScript';
import { redactComment } from '../commentRedactAnimationFunc';
import ReplyCommentItem from './replyCommentItem';
import ReplyCommentInputBlock from './replyCommentInputBlock';
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

    const [replyCommentsState, setReplyCommentsState] = useState('hidden');
    const [replyCommentInputState, setReplyCommentInputState] = useState('hidden');

    // ФУНКЦИЯ-БУМЕРАНГ ДЛЯ ОБНОВЛЕНИЯ КОММЕНТАРИЕВ
    const updateReplyCommentsList = async () => {
        getAllReplyComments(comment.id).then((data) => setReplyComments(data.rows)).catch((e) => alert(e));
    };


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
            await likeComment(commentId);
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

    }, [comment]);
    useEffect(() => {
        getUser(comment.userId).then(data => setUserInfo(data)).catch((e) => alert(e.response.data.message));
        getAllReplyComments(comment.id).then((data) => setReplyComments(data.rows)).catch((e) => alert(e));
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
                    <section className="buttonsBlock__formatButtons">
                        <button className="leavedComments-commentBlock__deleteButton" onClick={() => deleteCommentFunction(comment.id)} >
                            <svg version="1.1" width="25" height="25" viewBox="0 0 95 95" xmlns="http://www.w3.org/2000/svg">
                                <g transform="translate(0 -952.36)">
                                    <circle className="deleteIconBackground" cx="50" cy="1002.4" r="45.669" />
                                    <g transform="matrix(.89701 0 0 .89701 4.7763 101.09)">
                                        <rect x="36.146" y="987.36" width="28.54" height="42.168" ry="1.135" fill="#fff" />
                                        <circle cx="50.329" cy="984.4" r="3.4095" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                        <rect x="31.774" y="984.72" width="37.285" height="5.2808" ry="1.6759" fill="#fff" stroke="#ff8d8d" stroke-linecap="round" stroke-linejoin="round" stroke-width=".7783" />
                                        <g transform="translate(-.086624 .64035)" fill="#ff8d8d">
                                            <rect x="40.801" y="993.37" width="2.772" height="32.051" ry="1.386" />
                                            <rect x="49.117" y="993.37" width="2.772" height="32.051" ry="1.386" />
                                            <rect x="57.433" y="993.37" width="2.772" height="32.051" ry="1.386" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <button className='leavedComments-scaleCommentButton' onClick={(e) => deployComment(e.target)}></button>
                        <button className="leavedComments-commentBlock__redactButton" onClick={(e) => redactComment(e.target)} >
                            <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 51 51">
                                <path d="M9.6 40.4l2.5-9.9L27 15.6l7.4 7.4-14.9 14.9-9.9 2.5zm4.3-8.9l-1.5 6.1 6.1-1.5L31.6 23 27 18.4 13.9 31.5z" />
                                <path d="M17.8 37.3c-.6-2.5-2.6-4.5-5.1-5.1l.5-1.9c3.2.8 5.7 3.3 6.5 6.5l-1.9.5z" />
                                <path d="M29.298 19.287l1.414 1.414-13.01 13.02-1.414-1.412z" />
                                <path d="M11 39l2.9-.7c-.3-1.1-1.1-1.9-2.2-2.2L11 39z" />
                                <path d="M35 22.4L27.6 15l3-3 .5.1c3.6.5 6.4 3.3 6.9 6.9l.1.5-3.1 2.9zM30.4 15l4.6 4.6.9-.9c-.5-2.3-2.3-4.1-4.6-4.6l-.9.9z" />
                            </svg>
                        </button>
                        <button className="leavedComments-commentBlock__postButton disabledButton" onClick={() => postCommentChangesFunction(comment.id)}>Изменить</button>

                        <button className="leavedComments-commentBlock__showReplyCommentsButton" onClick={(e) => !replyCommentsState ? setReplyCommentsState('hidden') : setReplyCommentsState('')} >Ответы</button>
                        <button
                            className="leavedComments-commentBlock__createReplyCommentButton createReplyComment"
                            onClick={() => {
                                !replyCommentInputState ? setReplyCommentInputState('hidden') : setReplyCommentInputState('');
                                setReplyCommentsState('');
                            }
                            }>
                            Ответить
                        </button>
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
                <section className={`commentBlock-leavedReplyComments ${replyCommentsState}`}>
                    <ReplyCommentInputBlock state={replyCommentInputState} userInfo={userInfo} commentId={comment.id} updateReplyCommentsList={updateReplyCommentsList} />
                    {
                        replyComments.map(replyComment => {
                            return (
                                <ReplyCommentItem key={replyComment.id} replyComment={replyComment} updateReplyCommentsList={updateReplyCommentsList} />
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
                    <section className="buttonsBlock__formatButtons">
                        <button className='leavedComments-scaleCommentButton' onClick={(e) => deployComment(e.target)} ></button>
                        <button className="leavedComments-commentBlock__showReplyCommentsButton" onClick={(e) => !replyCommentsState ? setReplyCommentsState('hidden') : setReplyCommentsState('')}>Ответы</button>
                        <button
                            className="leavedComments-commentBlock__createReplyCommentButton createReplyComment"
                            onClick={() => {
                                !replyCommentInputState ? setReplyCommentInputState('hidden') : setReplyCommentInputState('');
                                setReplyCommentsState('');
                            }
                            }>
                            Ответить
                        </button>
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
                <section className={`commentBlock-leavedReplyComments ${replyCommentsState}`}>
                    <ReplyCommentInputBlock state={replyCommentInputState} userInfo={userInfo} commentId={comment.id} updateReplyCommentsList={updateReplyCommentsList} />
                    {

                        replyComments.map(replyComment => {
                            return (
                                <ReplyCommentItem key={replyComment.id} replyComment={replyComment} userInfo={userInfo} commentId={comment.id} updateReplyCommentsList={updateReplyCommentsList} />
                            )
                        })
                    }
                </section>
            </div>
    )
});
export default CommentItem;
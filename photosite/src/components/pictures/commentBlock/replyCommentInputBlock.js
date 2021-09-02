import { useState, useEffect } from 'react';
import './replyCommentInputBlock.css';
import { postReplyComment, getAllReplyComments } from '../../../http/replyCommentAPI';

const ReplyCommentInputBlock = ({ state, userInfo, commentId, updateReplyCommentsList }) => {


    const [replyCommentInputText, setReplyCommentInputText] = useState(`${userInfo.user.nickname}, `);
    const postReplyCommentFunction = async (text, commentId) => {
        try {
            const response = await postReplyComment(text, commentId);
            updateReplyCommentsList();
            return alert(response);
        } catch (e) {
            return alert(e.response.data.message);
        }
    };
    useEffect(() => {
        setReplyCommentInputText(`${userInfo.user.nickname}, `);
    }, [userInfo]);
    return (

        <div className={`leavedReplyComments_replyCommentInput ${state}`}>
            <textarea onClick={() => console.log(replyCommentInputText)} value={replyCommentInputText} className="replyCommentInput_input" onChange={(e) => setReplyCommentInputText(e.target.value)}></textarea>
            <button onClick={() => postReplyCommentFunction(replyCommentInputText, commentId)}>Отправить</button>
        </div >
    )
}
export default ReplyCommentInputBlock;
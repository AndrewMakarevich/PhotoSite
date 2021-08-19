import React, { useEffect, useState, useContext } from 'react';
import './commentsSection.css';
import deployComment from './commentDeploymentScript';
import { postComment, postCommentChanges, getPictureComments } from '../../http/commentsAPI';
import { Context } from '../../index';

const InfoAndCommentsContent = ({ picture, currentContent }) => {
    const { user } = useContext(Context);
    const [comments, setComments] = useState('');
    const [comment, setComment] = useState('');
    const [changedComments, setChangedComments] = useState([]);
    console.log(changedComments);
    const changeComment = (id, text) => {
        let alreadyExist;
        for (let i = 0; i < changedComments.length; i++) {
            if (changedComments[i].id === id) {
                alreadyExist = true;
                break;
            } else {
                alreadyExist = false;
                continue;
            }
        }
        if (alreadyExist) {
            setChangedComments(changedComments.map(comment => {
                if (comment.id === id) {
                    return { ...comment, ['text']: text }
                } else {
                    return comment;
                }
            }));
        } else {
            setChangedComments([...changedComments, { id: id, text: text, userId: user._user.id, pictureId: picture.id }]);
        }
    };
    const postCommentChangesFunction = async (id) => {
        try {
            let text;
            for (let i = 0; i < changedComments.length; i++) {
                if (changedComments[i].id === id) {
                    text = changedComments[i].text;
                    break;
                } else {
                    continue;
                }
            }
            if (text) {
                const response = await postCommentChanges(id, text);
                getPictureComments(picture.id).then(data => setComments(data.comments)).catch(e => alert(e.response.data.message));
                alert(response);
            }
        } catch (e) {
            alert(e.response.data.message);
        }
    }
    const postCommentFunction = async (text, pictureId) => {
        const response = await postComment(text, pictureId);
        getPictureComments(picture.id).then(data => setComments(data.comments)).catch(e => alert(e.response.data.message));
        return alert(response);
    };
    useEffect(() => {
        if (currentContent === 'comments') {
            deployComment();
        }
    }, [currentContent]);
    useEffect(() => {
        if (picture.id) {
            getPictureComments(picture.id).then(data => setComments(data.comments)).catch(e => alert(e.response.data.message));
        }
    }, [picture]);
    if (currentContent === 'info') {
        return (
            <section className="info-section">
                <article className="info-section_header">
                    {picture.header}
                </article>
                <section className="info-section_description">
                    <h1>DESCRIPTION</h1>
                    <div>{picture.description}</div>
                </section>
                {
                    (picture.add_info ?
                        picture.add_info.map(pictureI => {
                            return (
                                <section key={pictureI.id} className="info-section_addInfo">
                                    <h2>{pictureI.title}</h2>
                                    <div>{pictureI.description}</div>
                                </section>
                            )
                        })
                        :
                        null
                    )
                }
                <section className="info-section_tags">
                    {
                        (picture.tags ?
                            picture.tags.map(tag => {
                                return (
                                    <div key={tag.id}>{tag.text}</div>
                                )
                            })
                            :
                            null
                        )
                    }
                </section>
            </section>
        )
    } else if (currentContent === 'comments') {
        return (
            <section className="comments-section">
                <section className="comments-section__leavedComments">
                    {
                        (comments.map(comment => {
                            return (
                                comment.userId === user._user.id ?
                                    <div key={comment.id}>
                                        <textarea className={`leavedComments-comment`} onChange={(e) => changeComment(comment.id, e.target.value)}>{comment.text}</textarea>
                                        <button className={`leavedComments-scaleComment`}>scale</button>
                                        <button onClick={() => postCommentChangesFunction(comment.id)}>make changes</button>
                                    </div>
                                    :
                                    <div key={comment.id}>
                                        <div className={`leavedComments-comment`}>{comment.text}</div>
                                        <button className={`leavedComments-scaleComment`}>scale</button>
                                    </div>
                            )
                        }))
                    }
                </section>
                <section className="comments-section__createCommentBlock">
                    <textarea className="createCommentBlock__input" onChange={(e) => setComment(e.target.value)}></textarea>
                    <button className="createCommentBlock__button" onClick={() => postCommentFunction(comment, picture.id)}>Sand</button>
                </section>
            </section>
        )
    }

};

export default InfoAndCommentsContent;
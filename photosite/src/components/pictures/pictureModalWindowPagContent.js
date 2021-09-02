import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import './commentsSection.css';
import { postComment, getPictureComments } from '../../http/commentsAPI';
import { Context } from '../../index';
import CommentItem from "./commentBlock/commentItem";


const InfoAndCommentsContent = observer(({ picture, currentContent }) => {
    const { pictureComments } = useContext(Context);
    const [comment, setComment] = useState('');

    const postCommentFunction = async (text, pictureId) => {
        try {
            const textFulness = text.split(' ').join('');
            if (textFulness) {
                const response = await postComment(text, pictureId);
                getPictureComments(picture.id).then(data => pictureComments.setPictureComments(data.comments)).catch(e => alert(e.response.data.message));
                return alert(response);
            }
            return alert('Комментарий пуст');

        } catch (e) {
            return alert(e.response.data.message);
        }
    };

    useEffect(() => {
        if (currentContent === 'comments') {

        }
    }, [currentContent]);

    useEffect(() => {
        if (picture.id) {
            getPictureComments(picture.id).then(data => pictureComments.setPictureComments(data.comments)).catch(e => alert(e.response.data.message));
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
                        (pictureComments._pictureComments.map((comment) => {
                            return (
                                <CommentItem key={comment.id} picture={picture} comment={comment} />
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

});

export default InfoAndCommentsContent;
import React, { useState, useEffect } from 'react';
import { Comment } from '../../types';
import './Comments.css';
import { getDate, getTime } from '../../utils';
import Pagination from '../Pagination/Pagination';
import { APIStatus, Api } from '../../api/Api'
import Loader from '../Loader/Loader';


interface CommentsProps {
    username: string;
    eventId: string
}

const Comments: React.FC<CommentsProps> = ({ username, eventId }) => {
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [commentSubmitted, setCommentSubmitted] = useState<boolean>(false);
    const [commentsList, setCommentsList] = useState<Comment[]>([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [errMsg, setErrMsg] = useState<string>('');

    const itemsPerPage = 3;

    async function getComments(pageNumber: number) {
        setLoading(true);
        const fetched_comments = await Api.getComments({ eventId: eventId, page: pageNumber, limit: itemsPerPage });
        setLoading(false);
        setErrMsg('');
        // TODO: handle error
        if (fetched_comments.status !== APIStatus.Success) {
            console.error("Error fetching comments:", fetched_comments.data);
            setErrMsg(fetched_comments.data.error);
            return;
        }
        setCommentsList(fetched_comments.data.comments);
        setPageCount(Math.ceil(fetched_comments.data.total / itemsPerPage));
        setCommentSubmitted(false);
    }

    useEffect(() => {
        getComments(page);
    }, [eventId, page]);

    useEffect(() => {
        if (commentSubmitted) {
            getComments(page);
        }
    }, [commentSubmitted]);

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const handleCommentSubmit = async () => {
        if (newComment.trim() !== '') {
            const newCommentObj = {
                event_id: eventId,
                author: username,
                date: new Date(),
                content: newComment
            };

            setNewComment('');
            setLoading(true);
            const postRes = await Api.postComment(newCommentObj);
            setLoading(false);
            // TODO: handle error
            if (postRes.status !== APIStatus.Success) {
                console.error("Error posting comment:", postRes.data);
                setErrMsg(postRes.data);
            }
            else {
                setCommentSubmitted(true);
            }
        }
    };

    return (
        <>
            <div className="comments-container">
                <h2 className="headers">Comments:</h2>
                <div className='comments-list'>
                    <div className="add-comment">
                        <textarea className='add-comment-input'
                            placeholder="Add your comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={2}
                        />
                        <button className="blue-buttons" onClick={handleCommentSubmit}>Submit</button>
                    </div>
                    {loading ? <Loader isPartial={true} /> : null}
                    {errMsg ? <p className="error-msg">{errMsg}</p> : null}
                    {commentsList.map((comment, index) => (
                        <div key={index} className='comment-container'>
                            <p><b>From {comment.author} at {getDate(comment.date)}, {getTime(comment.date)}</b></p>
                            <p>{comment.content}</p>
                        </div>
                    ))}

                    <Pagination
                        pageCount={pageCount}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    );
};

export default Comments;

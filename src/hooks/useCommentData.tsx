// import { useEffect, useState } from "react";
// import { apiWithHeader } from "../components/api";

// type Comment = {
//     userId: number;
//     postId: number;
//     profileImageUrl: string;
//     name: string;
//     createdAt: string;
//     comment: string;
// }

// export const useCommentData = (userId: number, postId: number) => {
//     const [commentList, setCommentList] = useState<Comment[]>([]);
//     const [comment, setComment] = useState('');

//     useEffect(() => {
//         if (!userId || !postId) return;
//         const getComments = async () => {
//             const res = await apiWithHeader.get(`/post/${postId}/comments`);
//             setCommentList(res.data.list)
//         }
//         getComments();

//         const setComments = async () => {
//             const res = await apiWithHeader.post(`/post/${postId}/comments`);
//             setComment(res.data.list)
//         }
//         setComment();
//     },[userId, postId])

//   return { commentList, comment, setComment };
// };

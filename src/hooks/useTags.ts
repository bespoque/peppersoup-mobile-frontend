// import { useState, useEffect, useRef } from 'react';
// import { useApi } from '@/src/hooks/useApi';

// interface Tag {
//   id: number;
//   name: string;
// }

// export const useTags = () => {
//   const { request } = useApi();
//   const [tags, setTags] = useState<Tag[]>([]);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     const fetchTags = async () => {
//       if (hasFetched.current) return;
//       try {
//         const response = await request("/api/core/kitchen-operations/tag/all", "GET");
//         if (response?.resp_code === "00") {
//           setTags(response.data);
//           hasFetched.current = true; 
//         }
//       } catch (error) {
//         console.error("Error fetching tags:", error);
//       }
//     };

//     fetchTags();
//   }, [request]);

//   return { tags };
// };

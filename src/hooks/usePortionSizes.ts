// import { useState, useEffect, useRef } from "react";
// import { useApi } from "@/src/hooks/useApi";

// interface PortionSize {
//   id: number;
//   name: string;
//   amount: string;
// }

// export const usePortionSizes = () => {
//   const { request } = useApi();
//   const [portionSizes, setPortionSizes] = useState<PortionSize[]>([]);
//   const hasFetched = useRef(false);

//   useEffect(() => {
//     const fetchPortionSizes = async () => {
//       if (hasFetched.current) return;
//       try {
//         const data = await request('/api/core/kitchen-operations/portion-size/all', 'GET');
//         if (data.resp_code === "00") {
//           setPortionSizes(data.data.map((item: any) => ({
//             id: item.id,
//             name: item.name,
//             amount: item.amount,
//           })));
//           hasFetched.current = true;
//         }
//       } catch (err) {
//         console.error("Failed to fetch portion sizes:", err);
//       }
//     };

//     fetchPortionSizes();
//   }, [request]);

//   return { portionSizes };
// };

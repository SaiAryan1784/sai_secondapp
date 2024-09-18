// import {useState, useEffect} from 'react'

// const useAppwrite = (fn) => {

//     const [data, setData] = useState([])
//     const [isLoading, setIsLoading] = useState(true)

//     useEffect(() => {
//         const fetchData = async () => {
//         setIsLoading(true);
    
//         try {

//             const response = await fn();
//             setData(response)
//         } catch (error) {
//             Alert.alert('Error', error)
//         } finally {
//         setIsLoading(false)
//         }
//     }
//     }, [])


//     useEffect(() => {
//         fetchData();
//     }, [])

//     const refetch = () => fetchData();
    
//     return { data, isLoading, refetch };

// }

// export default useAppwrite;

import { Alert } from "react-native";
import { useEffect, useState } from "react";

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData(res);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch };
};

export default useAppwrite;
import React,{ useState,useEffect} from 'react'
import { useInfiniteQuery } from 'react-query'
import {useInView} from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function Home() 
{
    const request = useLocation().pathname.split('/').pop() 

    const{inView,ref}=useInView()
    const{
         data,
         status,
         fetchNextPage,
         isFetchingNextPage,
         hasNextPage,
         isFetching
         }=useInfiniteQuery(['content',request],fetchContent,
    {
      getNextPageParam:(page,allPage)=>
      {
         return page.pagination.offset+25
      }
    })
  
    useEffect(()=>
    {
      if(inView)
      {
        fetchNextPage()
      }
    },[inView])
  
    async function fetchContent(props)
    {
      const
      {
        queryKey,
        pageParam=0
      }=props
  
      const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=li8eH5l9MR7q04OEiQL98HXAUDKtuvhC&q=${queryKey[1]}&offset=${pageParam}&limit=25`)
      return res.data
    }
  
    const breakPoints = 
    {
      default: 4,
      999:3,
      540:2
    }

    console.log(isFetchingNextPage)

    return (
      <>
        <main className="w-[72rem] max-w-[100%] mx-auto px-[2rem]">
          <Masonry
            breakpointCols={breakPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data?.pages.map((page) => {
              return ( 
                  page.data.map((content) => {
                    return (
                       <div>
                         <img
                           className='block w-[100%]'
                           key={content.id}
                           src={content.images.downsized_medium.url}
                         />
                       </div>
                    );
                  })
              );
            })
            }
          </Masonry>
          {isFetching && <span className='text-[10rem] text-black'>...loading</span>}
        </main>
        <footer ref={ref}>fff</footer>
      </>
    );
}

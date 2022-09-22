import React,{ useState,useEffect,useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import {useInView} from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import axios from 'axios'

function App() 
{
  const{inView,ref}=useInView()
  const[request,setRequest]  = useState('cat')
  const{data,status,fetchNextPage}=useInfiniteQuery(['content',request],fetchContent,
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

  const random = data?.pages.map((page) => {
    return (
      <React.Component key={page.meta.response_id}>
        {page.data.map((content) => {
          return (
            <div>
              <img
                className="w-[100%] mb-[1.5rem]"
                key={content.id}
                src={content.images.original.url}
                alt=""
              />
            </div>
          );
        })}
      </React.Component>
    );
  }) 

  const breakPoints = 
  {
    default: 4,
    999:3,
    540:2
  }

  console.log(data)

  return (
    <>
      <header>
        <nav>
          <input type="text" />
        </nav>
      </header>
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
      </main>
      <footer ref={ref}>fff</footer>
    </>
  );
}

export default App

import React,{ useState,useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import {useInView} from 'react-intersection-observer'
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

  console.log(data)

  return(
    <>
      <header>
         <nav>
             <input type="text" />
         </nav>
      </header>
      <div>
        {
          data?.pages.map(page=>
            {
              return (
                <React.Fragment key={page.meta.response_id}>
                  {
                    page.data.map((content) => 
                    {
                      return <img key={content.id} src={content.images.original.url} alt="" />;
                    })}
                </React.Fragment>
              ); 
            })
        }
      </div>
      <footer ref={ref}></footer>
    </>
  )
}

export default App

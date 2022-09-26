import React, { useEffect, useState } from 'react'
import './Style.css'
import axios from 'axios'
import { Pagination } from 'antd';

function Hero_Section() {
    const [languages, setLanguages] = useState([])
    const [selectedLangeuge, setSelectedLangeuge] = useState("en")
    const [ServicePrivider, setServicePrivider] = useState([])
    const [total, setTotal] = useState("")
    const [page, setPage] = useState(1)
    const [postPage, setPostPage] = useState(15)
    const [serchData, setserchData] = useState('')

    useEffect(() => {
        axios.get("https://staging.cms.golden-dreams.org/api/v1/localization/languages")
            .then((res) => {
                setLanguages(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const languageHandler = (e) => {
        setSelectedLangeuge(e.target.value)
    }
    useEffect(() => {
        axios.get(`https://staging.cms.golden-dreams.org/api/v1/service-providers?lang=${selectedLangeuge}`)
            .then((res) => {
                setServicePrivider(res.data)
                setTotal(res.data.length)
            }).catch((err) => {
                console.log(err)
            })
    }, [selectedLangeuge])
    const indexOfLastPage = page * postPage;
    const indexOfFirstPage = indexOfLastPage - postPage;
    const currentPost = ServicePrivider.slice(indexOfFirstPage, indexOfLastPage)
    const filterData = ServicePrivider.slice(indexOfFirstPage, indexOfLastPage - 1)
    //  var a = ServicePrivider.map((newdata)=>{
    //      debugger
    //     return(
    //         <>
    //         {
    //          newdata.unshift(newdata.splice(newdata.findIndex(item => item.name === "issara institude"))[0])
    //         }
    //         </>
    //     )
    // })
    const serchDataHandler = (e) => {
        setserchData(e.target.value)
    }


    // console.log(a)
    return (
        <div className='container'>

            <div className='row'>
                <div className='col-sm-9 serchbar'>
                    <input value={serchData} type="text" placeholder='Search Here...' onChange={serchDataHandler} />
                </div>
                <div className='col-sm-3 dropdown'>
                    <select
                        value={selectedLangeuge}
                        onChange={languageHandler}
                    >
                        {

                            languages && languages.length != 0 ?
                                languages.map((lang, i) => {
                                    return (
                                        <>
                                            <option value={lang.code}>{lang.name_en}</option>
                                        </>
                                    )
                                })
                                : null
                        }
                    </select>
                </div>
            </div>
            <div className='row'>
                {/* {currentPost ? 
                 currentPost.unshift(currentPost.splice(currentPost.findIndex(item => item.name === "issara institude",1))[0])
                 : null
                } */}
                {/* {
                    newarr ? newarr :null
                } */}
                {
                     
                    serchData === '' ?

                        currentPost.map((data) => {
                            return (
                                <>
                                    
                                    <div className=" set_card">
                                        <div className="card">
                                            <div className="card-image">
                                                <figure>
                                                    {
                                                        data.image === null ? <img src='https://www.clipartmax.com/png/full/151-1517540_business-and-office-tools-business-service-icon.png'></img> :
                                                            <img src={data.image} alt="image" />
                                                    }
                                                </figure>
                                            </div>
                                            <div className="media">
                                                <div className="media-content">
                                                    <h3>{data.name === null ? "No Name" : data.name}</h3>
                                                    <h6 >{data.email === null ? <p>Email: NA</p> : data.email}</h6>
                                                    <a href={data.website} target="_blank">{data.website === null ? <p>Website: NA</p> : data.website}</a>
                                                </div>
                                            </div>

                                            <div className="rating" >
                                                <p> ratting score : {data.rating_score === null ? 0 : data.rating_score}</p>
                                                <p> ratting count : {data.rating_count === null ? 0 : data.rating_count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                        :
                        filterData.filter((items) => {
                            if (serchData === "") {
                                return items
                            }
                            else if (items.name.toLowerCase().includes(serchData.toLowerCase())) {
                                return items
                            }
                        }).map((items) => {
                            return (
                                <>
                                    <div className=" set_card mb-5">
                                        <div className="card">
                                            <div className="card-image">
                                                <figure>
                                                    {
                                                        items.image === null ? <img src='https://www.clipartmax.com/png/full/151-1517540_business-and-office-tools-business-service-icon.png'></img> :
                                                            <img src={items.image} alt="image" />
                                                    }
                                                </figure>
                                            </div>
                                            <div className="media">
                                                <div className="media-content">
                                                    <h3>{items.name}</h3>
                                                    <h6 >{items.email === null ? <p>Email: NA</p> : items.email}</h6>
                                                    <a href={items.website}>{items.website === null ? <p>Website: NA</p> : items.website}</a>
                                                </div>
                                            </div>

                                            <div className="rating" >
                                                <p> ratting score : {items.rating_score === null ? 0 : items.rating_score}</p>
                                                <p> ratting count : {items.rating_count === null ? 0 : items.rating_count}</p>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        })


                }
            </div>



            <Pagination
                onChange={(value) => setPage(value)}
                total={total}
                current={page}
                showSizeChanger={false}
                style={{ padding: "20px 0", display: "flex", justifyContent: "end" }}
            />



        </div >
    )
}
export default Hero_Section;

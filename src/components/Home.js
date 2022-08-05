import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'
import Card from './Card';

import { getList } from '../services/list';



function Home(props) {

    const [list, setList] = useState([]);
    const [filterKey, setData] = useState('');
    const [filterList , setFilterList] = useState();

    const childToParent = (childdata) => {
        setData(childdata);

    }

    useEffect(() => {
        let mounted = true;
        getList()
            .then(items => {
                if (mounted) {


                        setList(items.Data)

                }
            })

        return () => mounted = false

    },[])
    return (

        <div className="container-fluid">

            <Navbar  childToParent={childToParent} />
            <Card list={list} filterKey={filterKey}  />

        </div>
    );
}

export default Home;
import AllPosts from '@/components/AllPosts'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const page = () => {
    return (
        <div>
            <Navbar />
            <AllPosts />
            <Footer />
        </div>
    )
}

export default page
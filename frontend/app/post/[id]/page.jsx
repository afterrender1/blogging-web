import React from 'react'

const page =  async ({ params }) => {

    const { id } = await params;
    console.log(id);
    
    return (
        <>

          


        </>
    )
}

export default page
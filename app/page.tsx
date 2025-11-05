'use client'

import Header from './components/Header';
import Sidebar from './components/Sidebar';


export default function Example() {

  return (
    <>
      <div >
        <Sidebar />

        <div className="lg:pl-64">
          <Header />
          <main className="xl:pl-96">
            <div className="">{/* Main area */}</div>
          </main>
        </div>


      </div>
    </>
  )
}

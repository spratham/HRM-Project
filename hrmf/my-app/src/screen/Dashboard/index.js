import React from 'react'

function Dashboard() {
  return (
    <div>
        <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default Dashboard
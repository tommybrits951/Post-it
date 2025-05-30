
import BoardTab from './BoardTab'
export default function BoardList({boards}) {
    
    return (
        <ul className='absolute top-32 left-1/12 scroll w-10/12 h-9/12 overflow-y-scroll'>
            {boards ? boards.map((board, idx) => {
                return <BoardTab key={idx} board={board} />
            }) : null}
        </ul>
    )
}

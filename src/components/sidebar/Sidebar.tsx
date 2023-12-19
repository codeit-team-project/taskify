import { DASH_BOARD_DATA } from '@/mock/dashBoard'
import SidebarItem from './SidebarItem'

export default function Sidebar() {
  console.log(DASH_BOARD_DATA)

  return (
    <section>
      <div>
        <img src="large_logo.svg" />
        <img src="large_Taskify.svg" />
      </div>

      <div>
        <span>Dash Boards</span>
        <img src="add_box.svg" />
      </div>
      <div>
        {DASH_BOARD_DATA.dashboards.map((board) => (
          <li key={board.id}>
            <SidebarItem board={board} />
          </li>
        ))}
      </div>
    </section>
  )
}

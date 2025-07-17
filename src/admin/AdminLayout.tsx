import { Outlet, NavLink } from "react-router-dom";
import styles from "./AdminLayout.module.css";

const menu = [
  { path: "dashboard", label: "Dashboard" },
  { path: "users", label: "Quản lý người dùng" },
  { path: "characters", label: "Quản lý nhân vật" },
  { path: "recharge", label: "Quản lý nạp ngọc" },
  { path: "giftcodes", label: "Giftcode" },
  { path: "posts", label: "Bài viết" },
  { path: "downloads", label: "Tải game" },
  { path: "rankings", label: "Xếp hạng" },
  { path: "transactions", label: "Giao dịch" },
  { path: "settings", label: "Cấu hình hệ thống" },
];

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>Admin Panel</div>
        <nav>
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <span>Quản trị hệ thống</span>
        </header>
        <section className={styles.content}>
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;

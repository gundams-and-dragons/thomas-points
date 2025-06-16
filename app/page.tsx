import styles from "./page.module.css";
import type { User } from '@/app/types';

type UsersResponse  = {
  users: User[]
};

async function getUsers(): Promise<UsersResponse> {
  const res = await fetch(process.env.API_DOMAIN + "/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export default async function Home() {
  const usersResponse = await getUsers();

  return (
    <div className={styles.page}>
      <h1>Thomas Points Leaderboard:</h1>
      <ul>
        {usersResponse.users.map((user) => (
          <li key={user.id}>
            {user.name}: {user.points} points
          </li>
        ))}
      </ul>
    </div>
  );
}

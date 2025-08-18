import { LayoutInstructor } from "@/components/layouts/layout-bar.comp";
import { BookOpenIcon, ChatBubbleLeftIcon } from "@heroicons/react/16/solid";

const menu = [{
  text: 'My Lessons',
  href: '/student/lessons',
  icon: <BookOpenIcon width={20} height={20} />,
},
{
  text: 'Chating',
  href: '/student/chat',
  icon: <ChatBubbleLeftIcon width={20} height={20} />,
},
]
export default function StudentRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutInstructor menu={menu}>
      {children}
    </LayoutInstructor>
  );
}

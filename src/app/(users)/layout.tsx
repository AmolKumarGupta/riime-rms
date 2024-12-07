import AuthLayout from "@/components/custom/layout/auth";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}

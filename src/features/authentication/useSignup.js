import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useSignup() {
  //   const queryClient = useQueryClient();
  //   const navigate = useNavigate();

  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("Signup successfully");
      //   queryClient.setQueryData(["user"], user.user);
      //   navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Error signup");
    },
  });

  return { signup, isLoading };
}

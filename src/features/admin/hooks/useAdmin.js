import { adminServices } from "@/api/services/admin.service"
import { useQuery } from "@tanstack/react-query"

export const useGetAllAdmins = () => {
    return useQuery({
        queryKey: ["admins"],
        queryFn: () => adminServices.getAllAdmins(),
        select: (data) => data.admins,
    })
}

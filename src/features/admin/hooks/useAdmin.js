import { adminServices } from "@/api/services/admin.service"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAllAdmins = () => {
    return useQuery({
        queryKey: ["admins"],
        queryFn: () => adminServices.getAllAdmins(),
        select: (data) => data.admins,
    })
}

export const useCreateNewAdmin = () => {
    return useMutation({
        mutationKey: ["createAdmin"],
        mutationFn: (formData) => adminServices.createNewAdmin(formData),
    })
}
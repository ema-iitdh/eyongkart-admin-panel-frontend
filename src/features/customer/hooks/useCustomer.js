import { customerService } from "@/api/services/customer.service"
import { useQuery } from "@tanstack/react-query"


export const useGetAllCustomers = () => {
    return useQuery({
        queryKey: ['customers'],
        queryFn: () => customerService.getAllCustomers(),
        select: (data) => data.data,
    })
}
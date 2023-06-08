import { useRouter } from 'next/router'
import Link from 'next/link'

function ItemPage() {

    const router = useRouter()
    const data = router.query
    const itemNameToDisplay = JSON.stringify(data.itemName)


    return (
        <div>
            <h1>Item Page</h1>
            <p>{itemNameToDisplay}</p>
            <Link href="/MyProfile">Back To Project</Link>
        </div>

    )

}

export default ItemPage
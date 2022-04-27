const [searchUsers, setSearchUsers] = useState([])
// const [query, setQuery] = useState('')
// const [searchResult, setSearchResult] = useState([])
const apiUrl = 'http://localhost:4000/'


    useEffect(() => {
    fetch(`${apiUrl}/`)
    .then((res) => res.json())
    .then((res) => setSearchUsers(res.data))
    console.log(searchUsers)
    }, [])
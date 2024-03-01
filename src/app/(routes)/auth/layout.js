export default function Layout({children}) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white w-1/4 rounded-xl">
                {children}
            </div>
        </div>
    )
}   
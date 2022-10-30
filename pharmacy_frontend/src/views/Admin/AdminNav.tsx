import { FC, useState, useRef, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { BeakerIcon, HomeIcon, UserGroupIcon, QueueListIcon, Square2StackIcon, CircleStackIcon, Square3Stack3DIcon, DocumentIcon, DocumentTextIcon } from '@heroicons/react/24/solid'

const sidebarNavItems = [{
            'display': 'DashBoard',
            'icon': <HomeIcon className='h-6 w-6 text-dark-500'/>,
            'to': '/admin',
            'section': ''
        },{
            'display': 'Users',
            'icon': <UserGroupIcon className='h-6 w-6 text-dark-500'/>,
            'to': '/admin/manage/users',
            'section': 'manage_users'
        },{
            'display': 'Categories',
            'icon': <Square3Stack3DIcon className='h-6 w-6 text-dark-500'/>,
            'to': '/admin/manage/categories',
            'section': 'manage_categories'
        },{
            'display': 'Medicines',
            'icon': <CircleStackIcon className='h-6 w-6 text-dark-500'/>,
            'to': '/admin/manage/medicines',
            'section': 'manage_medicines'
        },{
            'display': 'Orders',
            'icon': <DocumentIcon className='h-6 w-6 text-dark-500'/>,
            'to': '/admin/manage/orders',
            'section': 'manage_orders'
        },{
            'display': 'Order Details',
            'icon': <DocumentTextIcon className='h-6 w-6 text-dark-500'/>,
            'to': '/admin/manage/order-details',
            'section': 'manage_order_details'
        }
]

const AdminNav: FC = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const location = useLocation(); 
    

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar-item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);


    // change active index
    useEffect(() => {
        const curPath = window.location.pathname;
        const activeItem = sidebarNavItems.findIndex(item => item.to === curPath);
        setActiveIndex(activeItem);
    }, [location]);

    return <>
        <div className='py-10 relative top-28 left-10 z-50 bg-white rounded-md px-10 overflow-auto'>
            <div className="font-bold text-2xl text-center pb-5">
                Pharmacy
            </div>
            <div ref={sidebarRef} className="w-auto">
                <div
                    ref={indicatorRef}
                    className="absolute top-18  w-3/4 rounded-md bg-cyan-300"
                    style={{
                        transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`,
                        zIndex:-1,
                        transition: '0.3s ease-in-out',
                        left: '50%'
                    }}
                ></div>
                {
                    sidebarNavItems.map((item, index) => (
                        <Link to={item.to} key={index}>
                            <div className={`sidebar-item p-3 ${activeIndex === index ? ' text-white' : ''}`}>
                                <div className="float-left">
                                    {item.icon}
                                </div>
                                <div className="flex">
                                    {item.display}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    </>
}

export default AdminNav
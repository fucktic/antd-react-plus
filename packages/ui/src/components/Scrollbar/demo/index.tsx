import Scrollbar from ".."

export const ScrollbarDemo = () => {
    return (
        <Scrollbar style={{ height: 200, overflow: 'auto' }} >
            <div style={{ height: '2000px', width: '2000px', backgroundColor: 'var(--color-primary-light-4)' }}>Content</div>
        </Scrollbar>
    )
}

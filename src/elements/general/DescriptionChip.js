const DescriptionChip = (data) => {
    const chipData = data.data
    return (
        <div style={{
            color: '#0076DA',
            border: '1px solid #A3CCF6',
            borderRadius: 13,
            padding: 10,
            width: 'auto'
        }}
        >
            {chipData}
        </div>
    )
}

export default DescriptionChip
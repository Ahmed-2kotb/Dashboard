import React, {useState, useEffect} from 'react';
import './ProductsPage.css';

function ProductsPage() {
	const defaultProducts = [
		{id: 1, name: 'Laptop', price: 1500},
		{id: 2, name: 'Phone', price: 800},
		{id: 3, name: 'Headphones', price: 150},
		{id: 4, name: 'Tablet', price: 500},
		{id: 5, name: 'Monitor', price: 300},
		{id: 6, name: 'Keyboard', price: 100},
		{id: 7, name: 'Mouse', price: 50},
		{id: 8, name: 'Speaker', price: 200},
		{id: 9, name: 'Webcam', price: 120},
		{id: 10, name: 'Charger', price: 40},
		{id: 11, name: 'Router', price: 250},
		{id: 12, name: 'External HDD', price: 600},
	];
	const [products, setProducts] = useState(() => {
		const saved = localStorage.getItem('products');
		if (saved) {
			const parsed = JSON.parse(saved);
			const merged = defaultProducts.filter(
				(p) => !parsed.find((s) => s.id === p.id)
			);
			return [...parsed, ...merged];
		}
		return defaultProducts;
	});
	const [newProduct, setNewProduct] = useState({name: '', price: ''});
	const [editProductId, setEditProductId] = useState(null);
	const [editProductData, setEditProductData] = useState({name: '', price: ''});
	const [searchTerm, setSearchTerm] = useState('');
	const [sortField, setSortField] = useState(null);
	const [sortOrder, setSortOrder] = useState('asc');
	const [currentPage, setCurrentPage] = useState(1);
	const productsPerPage = 4;

	useEffect(() => {
		localStorage.setItem('products', JSON.stringify(products));
	}, [products]);

	const handleAddProduct = (e) => {
		e.preventDefault();
		const nextId = products.length ? products[products.length - 1].id + 1 : 1;
		setProducts([
			...products,
			{id: nextId, ...newProduct, price: Number(newProduct.price)},
		]);
		setNewProduct({name: '', price: ''});
	};

	const handleDeleteProduct = (id) => {
		setProducts(products.filter((p) => p.id !== id));
	};

	const handleEditClick = (product) => {
		setEditProductId(product.id);
		setEditProductData({name: product.name, price: product.price});
	};

	const handleEditSave = (id) => {
		setProducts(
			products.map((p) =>
				p.id === id
					? {...p, ...editProductData, price: Number(editProductData.price)}
					: p
			)
		);
		setEditProductId(null);
		setEditProductData({name: '', price: ''});
	};

	const handleSort = (field) => {
		const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
		setSortField(field);
		setSortOrder(order);

		const sorted = [...products].sort((a, b) => {
			if (field === 'name')
				return order === 'asc'
					? a.name.localeCompare(b.name)
					: b.name.localeCompare(a.name);
			if (field === 'price')
				return order === 'asc' ? a.price - b.price : b.price - a.price;
			return 0;
		});

		setProducts(sorted);
	};
	const filteredProducts = products.filter((p) =>
		p.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);
	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<div className="products-page">
			<h2>Products Page</h2>

			<input
				type="text"
				placeholder="Search products..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="search-input"
			/>

			<form onSubmit={handleAddProduct} className="add-product-form">
				<input
					type="text"
					placeholder="Product Name"
					value={newProduct.name}
					onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
					required
				/>
				<input
					type="number"
					placeholder="Price"
					value={newProduct.price}
					onChange={(e) =>
						setNewProduct({...newProduct, price: e.target.value})
					}
					required
				/>
				<button type="submit">Add Product</button>
			</form>

			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th onClick={() => handleSort('name')} style={{cursor: 'pointer'}}>
							Name{' '}
							{sortField === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
						</th>
						<th onClick={() => handleSort('price')} style={{cursor: 'pointer'}}>
							Price ($){' '}
							{sortField === 'price' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
						</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{currentProducts.map((p) => (
						<tr key={p.id}>
							<td>{p.id}</td>
							<td>
								{editProductId === p.id ? (
									<input
										type="text"
										value={editProductData.name}
										onChange={(e) =>
											setEditProductData({
												...editProductData,
												name: e.target.value,
											})
										}
									/>
								) : (
									p.name
								)}
							</td>
							<td>
								{editProductId === p.id ? (
									<input
										type="number"
										value={editProductData.price}
										onChange={(e) =>
											setEditProductData({
												...editProductData,
												price: e.target.value,
											})
										}
									/>
								) : (
									p.price
								)}
							</td>
							<td>
								{editProductId === p.id ? (
									<button onClick={() => handleEditSave(p.id)}>Save</button>
								) : (
									<>
										<button onClick={() => handleEditClick(p)}>Edit</button>
										<button onClick={() => handleDeleteProduct(p.id)}>
											Delete
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className="pagination">
				<button
					onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
				>
					Prev
				</button>

				{Array.from({length: totalPages}, (_, i) => i + 1)
					.filter(
						(num) =>
							num === 1 ||
							num === totalPages ||
							Math.abs(num - currentPage) <= 1
					)
					.map((num) => (
						<button
							key={num}
							onClick={() => handlePageChange(num)}
							className={num === currentPage ? 'active' : ''}
						>
							{num}
						</button>
					))}

				<button
					onClick={() =>
						handlePageChange(Math.min(totalPages, currentPage + 1))
					}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default ProductsPage;

// Thinking in React

// State:
// - Current products to display
// - Search value
// - State of checkbox

// Props:
// - Original list of products (pass to root)
// - Category to display
// - Product to display
// etc.

class ProductCategoryRow extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ? (
      product.name
    ) : (
      <span style={{ color: 'red' }}>{product.name}</span>
    );

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends React.Component {
  filteredProducts() {
    return this.props.products.filter(({ name, stocked }) => {
      return (
        name.includes(this.props.nameFilter) &&
        (!this.props.inStockOnly || stocked)
      );
    });
  }

  render() {
    const rows = [];
    let lastCategory = null;

    const filtered = this.filteredProducts();

    filtered.forEach((product) => {
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category}
          />
        );
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  onNameChange = (e) => {
    this.props.onNameChange(e.target.value);
  };

  onCheckChange = (e) => {
    this.props.onInStockChange(e.target.checked);
  };

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.nameFilter}
          onChange={this.onNameChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            onChange={this.onCheckChange}
          />{' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameFilter: '',
      inStockOnly: false,
    };
  }

  updateNameFilter = (nameFilter) => {
    this.setState({ nameFilter });
  };

  updateInStockOnly = (inStockOnly) => {
    this.setState({ inStockOnly });
  };

  render() {
    return (
      <div>
        <SearchBar
          nameFilter={this.state.nameFilter}
          inStockOnly={this.state.inStockOnly}
          onNameChange={this.updateNameFilter}
          onInStockChange={this.updateInStockOnly}
        />
        <ProductTable
          products={this.props.products}
          nameFilter={this.state.nameFilter}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<FilterableProductTable products={PRODUCTS} />);

import pytest

from app import ExistingLoans, app, loan_payments, loans


# Pytest fixture to create a test client for the Flask app.
@pytest.fixture
def client():
    with app.test_client() as client:
        yield client


@pytest.mark.unit
def test_resolve_status_on_time():
    # Loan 1: due_date=2025-03-01, payment_date=2025-03-04 (3 days diff) should be "On Time"
    loan = loans[0]  # id 1
    status = ExistingLoans.resolve_status(loan, None)
    assert status == "On Time"


@pytest.mark.unit
def test_resolve_status_late():
    # Loan 2: due_date=2025-03-01, payment_date=2025-03-15 (14 days diff) should be "Late"
    loan = loans[1]  # id 2
    status = ExistingLoans.resolve_status(loan, None)
    assert status == "Late"


@pytest.mark.unit
def test_resolve_status_defaulted():
    # Loan 3: due_date=2025-03-01, payment_date=2025-04-05 (35 days diff) should be "Defaulted"
    loan = loans[2]  # id 3
    status = ExistingLoans.resolve_status(loan, None)
    assert status == "Defaulted"


@pytest.mark.unit
def test_resolve_status_unpaid():
    # Loan 4: no payment should return "Unpaid"
    loan = loans[3]  # id 4
    status = ExistingLoans.resolve_status(loan, None)
    assert status == "Unpaid"


@pytest.mark.functional
def test_home_route(client):
    response = client.get("/")
    assert response.status_code == 200
    # Ensure the welcome message is in the response.
    assert b"Welcome to the Loan Application API" in response.data


@pytest.mark.functional
def test_graphql_loans_query(client):
    query = """
    {
        loans {
            id
            name
            status
        }
    }
    """
    response = client.post("/graphql", json={"query": query})
    assert response.status_code == 200
    data = response.get_json()
    assert "data" in data
    assert "loans" in data["data"]
    # Check that each loan includes a status value
    for loan in data["data"]["loans"]:
        assert "status" in loan


@pytest.mark.functional
def test_add_payment_success(client):
    # Count current number of payments
    initial_count = len(loan_payments)
    new_payment_data = {"loan_id": 4, "payment_date": "2025-03-10"}
    response = client.post("/payments", json=new_payment_data)
    assert response.status_code == 201
    data = response.get_json()
    assert data["loan_id"] == 4
    assert "payment_date" in data
    # Verify that a new payment has been added.
    assert len(loan_payments) == initial_count + 1


@pytest.mark.functional
def test_add_payment_invalid_data(client):
    # Test missing payment_date field
    response = client.post("/payments", json={"loan_id": 1})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data


@pytest.mark.functional
def test_add_payment_invalid_date_format(client):
    # Test payment_date in an invalid format.
    response = client.post("/payments", json={"loan_id": 1, "payment_date": "03-04-2025"})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data

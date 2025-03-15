import datetime

import graphene
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_graphql import GraphQLView
from graphql import GraphQLError

app = Flask(__name__)
CORS(app)

loans = [
    {
        "id": 1,
        "name": "Tom's Loan",
        "interest_rate": 5.0,
        "principal": 10000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 2,
        "name": "Chris Wailaka",
        "interest_rate": 3.5,
        "principal": 500000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 3,
        "name": "NP Mobile Money",
        "interest_rate": 4.5,
        "principal": 30000,
        "due_date": datetime.date(2025, 3, 1),
    },
    {
        "id": 4,
        "name": "Esther's Autoparts",
        "interest_rate": 1.5,
        "principal": 40000,
        "due_date": datetime.date(2025, 3, 1),
    },
]

# original data issues
loan_payments = [
    {"id": 1, "loan_id": 1, "payment_date": datetime.date(2025, 3, 4)},
    {"id": 2, "loan_id": 2, "payment_date": datetime.date(2025, 3, 15)},
    {"id": 3, "loan_id": 3, "payment_date": datetime.date(2025, 4, 5)},
]

payment_statuses = [
    {"id": 1, "label": "Late", "severity": "warning", "lamda": lambda days: 6 <= days <= 30},
    {"id": 2, "label": "Defaulted", "severity": "error", "lamda": lambda days: days > 30},
    {"id": 3, "label": "On Time", "severity": "success", "lamda": lambda days: days <= 5},
    {"id": 4, "label": "Unpaid", "severity": "secondary", "lamda": None},
]


class LoanPayments(graphene.ObjectType):
    id = graphene.Int()
    loan_id = graphene.Int()
    payment_date = graphene.DateTime()


class PaymentStatuses(graphene.ObjectType):
    id = graphene.Int()
    label = graphene.String()
    severity = graphene.String()


class ExistingLoans(graphene.ObjectType):
    id = graphene.Int()
    name = graphene.String()
    interest_rate = graphene.Float()
    principal = graphene.Int()
    due_date = graphene.DateTime()
    payment_date = graphene.DateTime()
    status = graphene.String()

    def resolve_payment_date(self, info):
        try:
            for payment in loan_payments:
                if payment["loan_id"] == self["id"]:
                    return payment["payment_date"]
            return None
        except Exception as e:
            raise GraphQLError("Error retrieving payment date: " + str(e))

    def resolve_status(self, info):
        try:
            payment_date = None
            for payment in loan_payments:
                if payment["loan_id"] == self["id"]:
                    payment_date = payment["payment_date"]
                    break

            if payment_date is None:
                return "Unpaid"

            days_diff = (payment_date - self["due_date"]).days

            for status in payment_statuses:
                condition = status.get("lamda")
                if condition and condition(days_diff):
                    return status["label"]

            return "Unpaid"
        except Exception as e:
            raise GraphQLError("Error calculating status: " + str(e))


class Query(graphene.ObjectType):
    loans = graphene.List(ExistingLoans)
    loan_payments = graphene.List(LoanPayments)
    payment_statuses = graphene.List(PaymentStatuses)

    def resolve_loans(self, info):
        try:
            return loans
        except Exception as e:
            raise GraphQLError("Error retrieving loans: " + str(e))

    def resolve_loan_payments(self, info):
        try:
            return loan_payments
        except Exception as e:
            raise GraphQLError("Error retrieving loan payments: " + str(e))

    def resolve_payment_statuses(self, info):
        try:
            return payment_statuses
        except Exception as e:
            raise GraphQLError("Error retrieving payment statuses: " + str(e))


schema = graphene.Schema(query=Query)


app.add_url_rule("/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True))


@app.route("/")
def home():
    return "Welcome to the Loan Application API"


# REST endpoint to add a new loan payment
@app.route("/payments", methods=["POST"])
def add_payment():
    data = request.get_json()
    if not data or "loan_id" not in data or "payment_date" not in data:
        return jsonify({"error": "Invalid data. 'loan_id' and 'payment_date' are required."}), 400

    try:
        # Expecting date in "YYYY-MM-DD" format
        payment_date = datetime.datetime.strptime(data["payment_date"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "payment_date must be in YYYY-MM-DD format."}), 400

    new_id = max(payment["id"] for payment in loan_payments) + 1 if loan_payments else 1

    new_payment = {
        "id": new_id,
        "loan_id": int(data["loan_id"]),
        "payment_date": payment_date,
    }
    loan_payments.append(new_payment)

    # Convert payment_date to string for JSON serialization
    response_payment = {
        "id": new_payment["id"],
        "loan_id": new_payment["loan_id"],
        "payment_date": new_payment["payment_date"].isoformat(),
    }
    return jsonify(response_payment), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)

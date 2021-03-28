from numpy.linalg import solve
from numpy.random import randn


class RegressionProblem(object):

    def __init__(self, reg_data: dict):
        self.n = int(reg_data['features'])
        self.m = int(reg_data['samples'])
        self.A = None
        self.b = None

    def create_problem(self):
        self.A = randn(self.m, self.n)

        self.b = randn(self.m, 1)

    def solve(self):

        x = solve(self.A.T @ self.A, self.A.T @ self.b)

        return [item[0] for item in x]

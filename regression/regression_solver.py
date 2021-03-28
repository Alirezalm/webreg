from numpy.linalg import solve, norm
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
        # x = solve(self.A.T @ self.A, self.A.T @ self.b)
        #
        #

        m, n, A, b = self.m, self.n, self.A, self.b

        x = randn(n, 1)

        max_iter = 1000

        eps = 1e-4

        t = 0.01

        grad = A.T @ A @ x - A.T @ b
        error = norm(grad)
        obj = [[0]]
        for k in range(max_iter):
            grad = A.T @ A @ x - A.T @ b

            x = x - t * grad
            error = norm(grad)

            if error <= eps:
                obj = 0.5 * x.T @ A.T @ A @ x - b.T @ A @ x + 0.5 * b.T @ b
                break

        return {
            'sol': [item[0] for item in x],
            "error": error,
            'obj': obj[0][0],
            'max_iter': k
        }

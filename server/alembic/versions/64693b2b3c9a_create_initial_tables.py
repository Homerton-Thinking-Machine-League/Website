"""Create initial tables

Revision ID: 64693b2b3c9a
Revises: 
Create Date: 2018-08-16 02:00:19.096086

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '64693b2b3c9a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    roles_table = op.create_table(
        'roles',
        sa.Column('id', sa.INTEGER, primary_key=True),
        sa.Column('name', sa.VARCHAR(16))
    )

    admin_role_id = 1

    op.bulk_insert(roles_table, [
        {"id": admin_role_id, "name": "Admin"}
    ])

    op.bulk_insert(roles_table, [
        {"name": "User"}
    ])

    users_table = op.create_table(
        'users',
        sa.Column('id', sa.INTEGER, primary_key=True),
        sa.Column('name', sa.VARCHAR(255), nullable=False),
        sa.Column('role_id', sa.INTEGER, sa.ForeignKey('roles.id'), nullable=False)
    )

    default_admin_user_id = 1

    op.bulk_insert(users_table, [
        {"id": default_admin_user_id, "name": "Default Admin", "role_id": admin_role_id}
    ])

    op.create_table(
        'posts',
        sa.Column('id', sa.INTEGER, primary_key=True),
        sa.Column('author_id', sa.INTEGER, sa.ForeignKey('users.id'), nullable=False),
        sa.Column('time', sa.DATETIME(timezone=True)),
        sa.Column('text', sa.TEXT)
    )

    alt_id_types_table = op.create_table(
        'alt_id_types',
        sa.Column('id', sa.INTEGER, primary_key=True),
        sa.Column('name', sa.VARCHAR(255), nullable=False)
    )

    crsid_alt_id_type_id = 1

    op.bulk_insert(alt_id_types_table, [
        {"id": crsid_alt_id_type_id, "name": 'CRSid'}
    ])

    alt_ids_table = op.create_table(
        'alt_ids',
        sa.Column('id', sa.INTEGER, primary_key=True),
        sa.Column('type_id', sa.INTEGER, sa.ForeignKey('alt_id_types.id'), nullable=False),
        sa.Column('user_id', sa.INTEGER, sa.ForeignKey('users.id'), nullable=False),
        sa.Column('value', sa.VARCHAR(255), nullable=False)
    )

    op.bulk_insert(alt_ids_table, [
        {"type_id": crsid_alt_id_type_id, "user_id": default_admin_user_id, "value": "html1337"}
    ])

def downgrade():
    op.drop_table('alt_ids');
    op.drop_table('alt_id_types');
    op.drop_table('posts')
    op.drop_table('users')
    op.drop_table('roles')

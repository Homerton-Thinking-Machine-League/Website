"""create_tables

Revision ID: e6fa288b2ed5
Revises:
Create Date: 2018-09-20 13:17:17.159458

"""
from alembic import op
from sqlalchemy import (Column, ForeignKey,
                        INTEGER, VARCHAR, TEXT, TIMESTAMP)


# revision identifiers, used by Alembic.
revision = 'e6fa288b2ed5'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'role',
        Column('id', INTEGER, primary_key=True),
        Column('name', VARCHAR(255), nullable=False)
    )
    op.execute('''
        INSERT INTO "role" (name) VALUES ('Admin'), ('User');
    ''')

    op.create_table(
        'user',
        Column('id', INTEGER, primary_key=True),
        Column('name', VARCHAR(255), nullable=False),
        Column('role_id', INTEGER, ForeignKey('role.id'), nullable=False)
    )

    op.create_table(
        'post',
        Column('id', INTEGER, primary_key=True),
        Column('author_id', INTEGER, ForeignKey('user.id'), nullable=False),
        Column('time', TIMESTAMP(timezone=True), nullable=False),
        Column('text', TEXT)
    )

    op.create_table(
        'alt_id_type',
        Column('id', INTEGER, primary_key=True),
        Column('name', VARCHAR(255), nullable=False),
    )
    op.execute('''
        INSERT INTO "alt_id_type" (name) VALUES ('crsid');
    ''')

    op.create_table(
        'alt_id_user',
        Column('user_id', INTEGER, ForeignKey('user.id'), nullable=False),
        Column('alt_id_type_id', INTEGER,
               ForeignKey('alt_id_type.id'), nullable=False),
        Column('value', VARCHAR(255), nullable=False)
    )
    op.create_primary_key(
        'pk_alt_id_user', 'alt_id_user',
        ['user_id', 'alt_id_type_id']
    )


def downgrade():
    op.drop_table('alt_id_user')
    op.drop_table('alt_id_type')
    op.drop_table('post')
    op.drop_table('user')
    op.drop_table('role')
